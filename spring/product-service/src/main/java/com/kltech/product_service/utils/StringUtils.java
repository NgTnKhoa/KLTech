package com.kltech.product_service.utils;

import com.github.slugify.Slugify;

public class StringUtils {
    public static String toSlug(String str) {
        Slugify slugify = new Slugify();
        return slugify.slugify(str);
    }
}
