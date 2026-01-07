package org.webfrey.monti.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.webfrey.monti.entities.Study;
import org.webfrey.monti.entities.forms.Question;

public interface QuestionRepository extends JpaRepository<Question, Long> {
}
