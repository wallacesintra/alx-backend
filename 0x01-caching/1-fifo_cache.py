#!/usr/bin/env python3

"""
FIFO caching

"""


from collections import OrderedDict
from base_caching import BaseCaching


class FIFOCache(BaseCaching):
    """
    FIFO cache system

    """

    def __init__(self):
        """
        instantiate
        """

        super().__init__()
        self.cache_data = OrderedDict()

    def put(self, key, item):
        """
        assign to the dictionary self.cache_data
        the item value for the key key

        """

        if (key is None or item is None):
            return

        self.cache_data[key] = item

        if len(self.cache_data) > self.MAX_ITEMS:
            # remove the first element using popitem
            first_key, _ = self.cache_data.popitem(False)

            print(f"DISCARD: {first_key}")

    def get(self, key):
        """
        return the value in self.cache_data linked to key

        """

        if key is None:
            return

        return self.cache_data.get(key)
