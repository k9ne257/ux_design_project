package org.webfrey.monti.apis;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.webfrey.monti.entities.forms.Question;
import org.webfrey.monti.repositories.QuestionRepository;

import java.util.List;

@RestController
@RequestMapping("/api/questions")
@CrossOrigin("*")
public class QuestionAPI {

    @Autowired
    private QuestionRepository questionRepository;

    @GetMapping
    public List<Question> getQuestions() {
        return questionRepository.findAll();
    }

    @GetMapping("/{id}")
    public Question getQuestionById(@PathVariable Long id) {
        return questionRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Question createQuestion(Question question) {
        return questionRepository.save(question);
    }

    @PutMapping
    public Question updateQuestion(Question question) {
        return questionRepository.save(question);
    }

    @DeleteMapping("/{id}")
    public void deleteQuestion(@PathVariable Long id) {
        // TODO null check before deleting
        questionRepository.deleteById(id);
    }
}