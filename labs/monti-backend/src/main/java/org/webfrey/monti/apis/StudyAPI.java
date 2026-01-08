package org.webfrey.monti.apis;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.webfrey.monti.entities.Study;
import org.webfrey.monti.repositories.StudyRepository;

import java.util.List;

@RestController
@RequestMapping("/api/studies")
@CrossOrigin("*")
public class StudyAPI {

    @Autowired
    private StudyRepository studyRepository;

    @GetMapping
    public List<Study> getStudys() {
        return studyRepository.findAll();
    }

    @GetMapping("/{id}")
    public Study getStudyById(@PathVariable Long id) {
        return studyRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Study createStudy(@RequestBody Study study) {
        return studyRepository.save(study);
    }

    @PutMapping
    public Study updateStudy(Study study) {
        return studyRepository.save(study);
    }

    @DeleteMapping("/{id}")
    public void deleteStudy(@PathVariable Long id) {
        // TODO null check before deleting
        studyRepository.deleteById(id);
    }
}