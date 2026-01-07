package org.webfrey.monti.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Bracelet {

    @Id
//    @GeneratedValue()
    private Long id;
    private String model;
    private String producer;
    private String firmware;


}
