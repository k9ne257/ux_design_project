package org.webfrey.monti.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.webfrey.monti.entities.Study;

import java.util.UUID;

public interface ParticipantRepository extends JpaRepository<UUID, Study> {
}
