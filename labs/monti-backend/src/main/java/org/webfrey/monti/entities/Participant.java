package org.webfrey.monti.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
public class Participant {

    @Id
    @GeneratedValue
    private UUID id;
    private String firstName;
    private String lastName;
    private String address;
    private String email;
    private String telefonnummer;
    private String dailyAdhaerence;
    private String weeklyAdhaerence;
    private Boolean isRegistered;

    @ManyToOne
    @JoinColumn(name = "study_id", nullable = false)
    private Study study;

    //TODO bracelet reusable?
//    @ManyToOne
    @OneToOne
    @JoinColumn(name = "bracelet_id")
    private Bracelet bracelet;
}
