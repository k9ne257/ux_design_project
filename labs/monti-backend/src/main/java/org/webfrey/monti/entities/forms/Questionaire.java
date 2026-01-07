package org.webfrey.monti.entities.forms;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Questionaire {

    @Id
    private Long id;

    @ManyToOne
    private Questions questions;
}
