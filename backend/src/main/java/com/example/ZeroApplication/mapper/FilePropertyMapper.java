package com.example.ZeroApplication.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import com.example.ZeroApplication.dto.FilePropertyDto;
import com.example.ZeroApplication.entity.FilePropertyEntity;

@Mapper(componentModel = "spring")
public abstract class FilePropertyMapper {
    @Mapping(target = "uuid", source = "uuid")
    public abstract FilePropertyDto toFilePropertyDto(FilePropertyEntity file);
}

