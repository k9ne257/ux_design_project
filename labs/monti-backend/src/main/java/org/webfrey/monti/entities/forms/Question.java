package org.webfrey.monti.entities.forms;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Question {

    @Id
    @GeneratedValue
    private Long id;
    private String questionMessage;
    private String questionType;
    private String answerType;
    private String isMultipleChoice;
}
