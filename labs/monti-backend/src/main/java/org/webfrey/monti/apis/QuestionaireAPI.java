package org.webfrey.monti.apis;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.webfrey.monti.entities.forms.Questionaire;
import org.webfrey.monti.repositories.QuestionaireRepository;

import java.util.List;

@RestController
@RequestMapping("/api/questionaireaires")
@CrossOrigin("*")
public class QuestionaireAPI {

    @Autowired
    private QuestionaireRepository questionaireRepository;

    @GetMapping
    public List<Questionaire> getQuestionaires() {
        return questionaireRepository.findAll();
    }

    @GetMapping("/{id}")
    public Questionaire getQuestionaireById(@PathVariable Long id) {
        return questionaireRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Questionaire createQuestionaire(Questionaire questionaire) {
        return questionaireRepository.save(questionaire);
    }

    @PutMapping
    public Questionaire updateQuestionaire(Questionaire questionaire) {
        return questionaireRepository.save(questionaire);
    }

    @DeleteMapping("/{id}")
    public void deleteQuestionaire(@PathVariable Long id) {
        // TODO null check before deleting
        questionaireRepository.deleteById(id);
    }
}