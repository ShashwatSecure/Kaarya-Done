package com.example.Kaarya_Done.util;

import java.text.BreakIterator;
import java.util.*;
import java.util.stream.Collectors;

public class KeywordUtil {

    private static final Set<String> STOP_WORDS = Set.of(
            "the", "and", "is", "in", "at", "which", "on", "a", "an", "or", "for", "of", "to", "with", "by"
    );

    public static String generateKeywords(String title, String description) {
        if (title == null) title = "";
        if (description == null) description = "";
        String combined = (title + " " + description).toLowerCase();
        return combined.replaceAll("[.,-]", " ").trim().replaceAll("\\s+", ",");
    }
}
