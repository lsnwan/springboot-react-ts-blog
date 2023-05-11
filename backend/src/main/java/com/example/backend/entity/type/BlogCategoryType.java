package com.example.backend.entity.type;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public enum BlogCategoryType {
    HOBBY,LIFE,SHOPPING, IT;

    public static BlogCategoryType from(String type) {
        return BlogCategoryType.valueOf(type.toUpperCase());
    }

    public static boolean isType(String typeName) {
        List<BlogCategoryType> types = Arrays.stream(BlogCategoryType.values())
                .filter(type -> type.name().equals(typeName))
                .collect(Collectors.toList());

        return types.size() != 0;
    }

}
