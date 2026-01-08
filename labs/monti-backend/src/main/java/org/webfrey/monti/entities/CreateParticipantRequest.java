package org.webfrey.monti.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

public record CreateParticipantRequest(

        String firstName,
        String lastName,
        String address,
        String email,
        String telefonnummer,
        String dailyAdhaerence,
        String weeklyAdhaerence,
        Boolean isRegistered,
        Long appId,
        Long braceletId,
        Long studyId
) { }
