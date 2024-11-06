package com.example.ZeroApplication.entity;

import java.util.UUID;

import org.hibernate.annotations.UuidGenerator;
import org.hibernate.annotations.UuidGenerator.Style;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "file_properties")
public class FilePropertyEntity {
    @Id
    @Column(name = "id")
    @GeneratedValue
    @UuidGenerator(style = Style.RANDOM)
    private UUID uuid;

    @Column(name = "link_json")
    private String linkJson;

    @Column(name = "name")
    private String name;
}
