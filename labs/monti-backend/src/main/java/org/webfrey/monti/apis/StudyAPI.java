package org.webfrey.monti.apis;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.webfrey.monti.entities.Participant;
import org.webfrey.monti.entities.Study;
import org.webfrey.monti.repositories.StudyRepository;
import org.webfrey.monti.services.StudyService;

import java.util.List;

@RestController
@RequestMapping("/api/studies")
@CrossOrigin("*")
public class StudyAPI {

    @Autowired
    private StudyService studyService;

    @GetMapping
    public List<Study> getStudies() {
        return studyService.findAll();
    }

    @GetMapping("/{id}")
    public Study getStudyById(@PathVariable Long id) {
        return studyService.findById(id);
    }

    @GetMapping("/{id}/participants")
    public List<Participant> getParticipantsByStudy(@PathVariable Long id) {
        return studyService.getParticipantsByStudyId(id);
    }

    @PostMapping
    public Study createStudy(@RequestBody Study study) {
        return studyService.save(study);
    }

    @PutMapping
    public Study updateStudy(Study study) {
        return studyService.save(study);
    }

    @DeleteMapping("/{id}")
    public void deleteStudy(@PathVariable Long id) {
        // TODO null check before deleting
        studyService.deleteById(id);
    }
}