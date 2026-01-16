package org.webfrey.monti.services;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.webfrey.monti.entities.Bracelet;
import org.webfrey.monti.entities.CreateParticipantRequest;
import org.webfrey.monti.entities.Participant;
import org.webfrey.monti.entities.Study;
import org.webfrey.monti.repositories.BraceletRepository;
import org.webfrey.monti.repositories.ParticipantRepository;
import org.webfrey.monti.repositories.StudyRepository;

import java.util.List;

@Slf4j
@Service
public class StudyService {

    @Autowired
    private ParticipantRepository participantRepository;

    @Autowired
    private BraceletRepository braceletRepository;

    @Autowired
    private StudyRepository studyRepository;

    public Study save(Study study) {
        return studyRepository.save(study);
    }

    public List<Participant> getParticipantsByStudyId(Long studyId) {
        return participantRepository.findByStudyId(studyId);
    }

    public Study findById(Long id) {
        return studyRepository.findById(id).orElse(null);
    }

    public List<Study> findAll() {
        return studyRepository.findAll();
    }

    public void deleteById(Long id) {
        studyRepository.deleteById(id);
    }
}
