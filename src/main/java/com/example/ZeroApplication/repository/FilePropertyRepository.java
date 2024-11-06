package com.example.ZeroApplication.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.ZeroApplication.entity.FilePropertyEntity;

@Repository
public interface FilePropertyRepository  extends JpaRepository<FilePropertyEntity, UUID> {
    Optional<FilePropertyEntity> findById(UUID id);
}
