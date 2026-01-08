package org.webfrey.monti.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
public class Bracelet {

    @Id
    @GeneratedValue
    private Long id;
    private String model;
    private String producer;
    private String firmware;
    private LocalDateTime assignedAt;
    private LocalDateTime returnedAt;


    //TODO bracelet reusable?
//    @OneToMany
//    @OneToOne
//    private Participant participant;
}
