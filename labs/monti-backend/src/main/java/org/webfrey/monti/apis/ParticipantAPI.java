package org.webfrey.monti.apis;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.webfrey.monti.entities.Participant;
import org.webfrey.monti.repositories.ParticipantRepository;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/participants")
@CrossOrigin("*")
public class ParticipantAPI {

    @Autowired
    private ParticipantRepository participantRepository;

    @GetMapping
    public List<Participant> getParticipants() {
        return participantRepository.findAll();
    }

    @GetMapping("/{id}")
    public Participant getParticipantById(@PathVariable UUID id) {
        return participantRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Participant createParticipant(Participant participant) {
        return participantRepository.save(participant);
    }

    @PutMapping
    public Participant updateParticipant(Participant participant) {
        return participantRepository.save(participant);
    }

    @DeleteMapping("/{id}")
    public void deleteParticipant(@PathVariable UUID id) {
        participantRepository.deleteById(id);
    }
}