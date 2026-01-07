package org.webfrey.monti.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
public class Participant {

    @Id
//    @GeneratedValue()
    private UUID id;
    private String name;
    private String email;
    private String telefonnummer;
    private String dailyAdhaerence;
    private String weeklyAdhaerence;
    private Long appId;
    private Long braceletId;
}
