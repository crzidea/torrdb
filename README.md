# torrdb
Another pirate bay.

## Prepare Elasticsearch

1. Create a lifecycle policy
    ```
    PUT _ilm/policy/torrdb
    {
      "policy": {
        "phases": {
          "hot": {
            "min_age": "0ms",
            "actions": {
              "rollover": {
                "max_size": "100mb"
              },
              "set_priority": {
                "priority": 100
              }
            }
          },
          "warm": {
            "actions": {
              "forcemerge": {
                "max_num_segments": 1
              }
            }
          }
        }
      }
    }
    ```
2. Create an index template to apply the lifecycle policy
    ```
    PUT _template/torrdb
    {
      "version": 1,
      "order": 0,
      "index_patterns": [
        "torrdb-*"
      ],
      "settings": {
        "index": {
          "lifecycle": {
            "name": "torrdb",
            "rollover_alias": "torrdb"
          },
          "number_of_replicas": "0"
        }
      },
      "mappings": {
        "_doc": {
          "_routing": {
            "required": false
          },
          "numeric_detection": false,
          "dynamic_date_formats": [
            "strict_date_optional_time",
            "yyyy/MM/dd HH:mm:ss Z||yyyy/MM/dd Z"
          ],
          "_meta": {},
          "dynamic": true,
          "_source": {
            "excludes": [],
            "includes": [],
            "enabled": true
          },
          "dynamic_templates": [],
          "date_detection": true,
          "properties": {}
        }
      }
    }
    ```
3. Bootstrap the initial time-series index
    ```
    PUT torrdb-000001
    {
      "aliases": {
        "torrdb": {
          "is_write_index": true
        }
      }
    }
    ```
4. Ensure that the new indices don’t grow too large while waiting for the rollover check
    ```
    PUT _cluster/settings
    {
      "transient": {
        "indices.lifecycle.poll_interval": "10s"
      }
    }

    ```

Reference:
- https://www.elastic.co/guide/en/elasticsearch/reference/current/getting-started-index-lifecycle-management.html
- https://www.elastic.co/guide/en/elasticsearch/reference/current/ilm-reindexing-into-rollover.html

