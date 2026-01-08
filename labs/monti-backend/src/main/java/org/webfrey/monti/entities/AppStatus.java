package org.webfrey.monti.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class AppStatus {

    @Id
    @GeneratedValue
    private Long id;
    private Long smartphoneId;
    private String model;
    private String os;
    private String status;
    private String producer;
    private String montiVersion;
}