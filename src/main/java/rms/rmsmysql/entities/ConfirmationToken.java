package rms.rmsmysql.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import rms.rmsmysql.model.ContactModel;

import javax.persistence.*;
import java.util.Date;
import java.util.UUID;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "ConfirmationToken")
public class ConfirmationToken {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="token_id")
    private long tokenid;

    @Column(name="confirmation_token")
    private String confirmationToken;

    @Temporal(TemporalType.TIMESTAMP)
    private Date createdDate;

    @Column
    private boolean isEnabled;

    @ManyToOne(targetEntity = Work.class, fetch = FetchType.EAGER)
    @JoinColumn(nullable = false)
    private Work work;



    public ConfirmationToken(Work work) {
        this.work = work;
        createdDate = new Date();
        confirmationToken = UUID.randomUUID().toString();
    }

}
