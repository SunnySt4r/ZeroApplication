package com.example.ZeroApplication.mapper;


import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import com.example.ZeroApplication.config.Config;
import com.example.ZeroApplication.dto.FilePropertyDto;
import com.example.ZeroApplication.entity.FilePropertyEntity;

@Mapper(componentModel = "spring")
public abstract class FilePropertyMapper {
    @Mapping(target = "link", source = "uuid", qualifiedByName = "toUrl")
    public
    abstract FilePropertyDto toFilePropertyDto(FilePropertyEntity file);

    @Named("toUrl")
    public static String toUrl(String uuid) {
        return Config.PATH.toString() + uuid;
    }
}

