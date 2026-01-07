package org.webfrey.monti.apis;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.webfrey.monti.entities.Bracelet;
import org.webfrey.monti.repositories.BraceletRepository;

import java.util.List;

@RestController
@RequestMapping("/api/bracelets")
@CrossOrigin("*")
public class BraceletAPI {

    @Autowired
    private BraceletRepository braceletRepository;

    @GetMapping
    public List<Bracelet> getBracelets() {
        return braceletRepository.findAll();
    }

    @GetMapping("/{id}")
    public Bracelet getBraceletById(@PathVariable Long id) {
        return braceletRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Bracelet createBracelet(Bracelet bracelet) {
        return braceletRepository.save(bracelet);
    }

    @PutMapping
    public Bracelet updateBracelet(Bracelet bracelet) {
        return braceletRepository.save(bracelet);
    }

    @DeleteMapping("/{id}")
    public void deleteBracelet(@PathVariable Long id) {
        // TODO null check before deleting
        braceletRepository.deleteById(id);
    }
}