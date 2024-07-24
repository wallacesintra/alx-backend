# Cache

A caching system stores frequently accessed data to speed up retrieval and reduce latency.

## FIFO

First In First Out

It is a cache eviction policy where the oldest cached items (those that entered the cache first) are removed first when the cache reaches its capacity. This method is simple but does not consider the frequency or recency of data access.

## LIFO

Last In, First Out

It is a cache eviction policy where the most recently added items are removed first when the cache reaches its capacity. This method is less common in caching systems compared to others.

## LRU

Least Recently Used

t is a cache eviction policy that removes the least recently accessed items first when the cache reaches its capacity. LRU is commonly used because it is based on the assumption that items accessed recently are more likely to be accessed again soon.

## MRU

Most Recently Used

It is a cache eviction policy where the most recently accessed items are removed first when the cache reaches its capacity. This policy can be useful in specific scenarios where older items are more likely to be accessed again.
