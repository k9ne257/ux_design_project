package org.webfrey.monti.entities;

import jakarta.annotation.Generated;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class Study {

    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private String description;
    private String status;
    private LocalDateTime startDate;
    private LocalDateTime endDate;

//    @OneToMany(mappedBy = "study")
//    private List<Participant> participant;
}
