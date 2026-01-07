package org.webfrey.monti.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.webfrey.monti.entities.Study;

public interface QuestionRepository extends JpaRepository<Long, Study> {
}
