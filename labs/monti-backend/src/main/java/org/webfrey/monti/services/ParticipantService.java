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

@Slf4j
@Service
public class ParticipantService {

    @Autowired
    private ParticipantRepository participantRepository;

    @Autowired
    private BraceletRepository braceletRepository;

    @Autowired
    private StudyRepository studyRepository;

    public Participant save(CreateParticipantRequest createParticipantRequest) {
        Participant newParticipant = new Participant();
        newParticipant.setFirstName(createParticipantRequest.firstName());
        newParticipant.setLastName(createParticipantRequest.lastName());
        newParticipant.setAddress(createParticipantRequest.address());
        newParticipant.setEmail(createParticipantRequest.email());
        newParticipant.setTelefonnummer(createParticipantRequest.telefonnummer());
        newParticipant.setDailyAdhaerence(createParticipantRequest.dailyAdhaerence());
        newParticipant.setWeeklyAdhaerence(createParticipantRequest.weeklyAdhaerence());
        newParticipant.setIsRegistered(createParticipantRequest.isRegistered()); // or getRegistered() depending on your entity
//        newParticipant.setAppId(createParticipantRequest.appId());

//        studyRepository.findById(createParticipantRequest.studyId()).ifPresent(newParticipant::setStudy);
//        braceletRepository.findById(createParticipantRequest.braceletId()).ifPresent(newParticipant::setBracelet);
        log.info("Study ID: " + createParticipantRequest.studyId());
        log.info("finby in repo: " + studyRepository.findById(createParticipantRequest.studyId()));
        Study study = studyRepository.findById(createParticipantRequest.studyId())
                .orElseThrow(() -> new IllegalArgumentException(
                        "Study not found for id=" + createParticipantRequest.studyId()
                ));
        newParticipant.setStudy(study);

        if (createParticipantRequest.braceletId() != null) {
            Bracelet bracelet = braceletRepository.findById(createParticipantRequest.braceletId())
                    .orElseThrow(() -> new IllegalArgumentException(
                            "Bracelet not found for id=" + createParticipantRequest.braceletId()
                    ));
            newParticipant.setBracelet(bracelet);

//             bracelet.setParticipant(newParticipant);
        }
        return participantRepository.save(newParticipant);
    }
}
