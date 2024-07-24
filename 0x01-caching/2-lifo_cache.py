#!/usr/bin/env python3

"""
LIFO caching

"""


from collections import OrderedDict
from base_caching import BaseCaching


class LIFOCache(BaseCaching):
    """
    LIFO Caching System

    """

    def __init__(self):
        """
        instantiate class
        """
        super().__init__()
        self.cache_data = OrderedDict()

    def put(self, key, item):
        """
        assign to the dictionary self.cache_data
        the item value for the key key
        """

        if key is None or item is None:
            return

        if key not in self.cache_data:
            if len(self.cache_data) > self.MAX_ITEMS:
                last_key, _ = self.cache_data.popitem(True)
                print(f"DISCARD: {last_key}")
        self.cache_data[key] = item
        self.cache_data.move_to_end(key=key, last=True)

    def get(self, key):
        """
        return the value in self.cache_data linked to key.
        """

        if key is None:
            return

        return self.cache_data.get(key)
