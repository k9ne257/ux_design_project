package org.webfrey.monti.repositories;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.webfrey.monti.entities.Study;

import java.time.LocalDateTime;

public interface StudyRepository extends JpaRepository<Long, Study> {
}
