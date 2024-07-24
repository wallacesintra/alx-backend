#!/usr/bin/python3

"""
Basic dictionary

"""


from base_caching import BaseCaching


class BasicCache(BaseCaching):
    """
    child of BaseCaching

    """

    def put(self, key, item):
        """
        assign to the dictionary self.cache_data
        the item value for the key key.
        """

        if (key is not None and item is not None):
            self.cache_data[key] = item

    def get(self, key):
        """
        return the value in self.cache_data linked to key

        """

        if (key is not None):
            return self.cache_data[key]

        return None
