package com.workgram.jpa;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

@Entity
@Table(name="freelancers", catalog="workgram" )
// Define named queries here
@NamedQueries ( {
	@NamedQuery ( name="FreelancerEntity.countAll", query="SELECT COUNT(x) FROM FreelancerEntity x" )
} )
public class FreelancerEntity  implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id", nullable=false)
	private Integer    id           ;
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	
	@Column(name="username", length=50)
    private String     username ;
	@Column(name="name", length=500)
	private String     name ;
	@Column(name="status", length=500)
	private String     status ;
    
    public String getUsername() {
		return username;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getMobile() {
		return mobile;
	}
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	public String getQualification() {
		return qualification;
	}
	public void setQualification(String qualification) {
		this.qualification = qualification;
	}
	public String getSkillset() {
		return skillset;
	}
	public void setSkillset(String skillset) {
		this.skillset = skillset;
	}
	public String getExp() {
		return exp;
	}
	public void setExp(String exp) {
		this.exp = exp;
	}
	public String getPhoto() {
		return photo;
	}
	public void setPhoto(String photo) {
		this.photo = photo;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	@Column(name="email", length=500)
    private String     email ;
    @Column(name="mobile", length=500)
    private String     mobile ;
    @Column(name="qualification", length=500)
    private String     qualification ;
    @Column(name="skillset", length=500)
    private String     skillset ;
    @Column(name="exp", length=500)
    private String     exp ;
    @Column(name="photo", length=500)
    private String     photo ;

	
	public String toString(){
		return ""+ this.username+this.status;
	}
    

}
