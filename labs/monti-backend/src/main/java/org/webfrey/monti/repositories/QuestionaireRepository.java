package org.webfrey.monti.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.webfrey.monti.entities.Study;
import org.webfrey.monti.entities.forms.Questionaire;

public interface QuestionaireRepository extends JpaRepository<Questionaire,Long> {
}
