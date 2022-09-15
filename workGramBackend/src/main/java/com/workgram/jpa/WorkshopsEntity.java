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
@Table(name="workshops", catalog="workgram" )
// Define named queries here
@NamedQueries ( {
	@NamedQuery ( name="WorkshopsEntity.countAll", query="SELECT COUNT(x) FROM WorkshopsEntity x" )
} )
public class WorkshopsEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id",  nullable=false)
    private Integer     id ;
	@Column(name="username", length=500)
    private String     username ;
	@Column(name="name", length=500)
	private String     name ;
	@Column(name="wdate", length=500)
	private String     wdate ;
	@Column(name="wtime", length=500)
	private String     wtime ;
	@Column(name="description", length=1000)
	private String     description ;
	@Column(name="location", length=500)
	private String     location ;
	@Column(name="topics", length=500)
	private String     topics ;
	@Column(name="banner", length=500)
	private String     banner ;
	@Column(name="reglink", length=500)
	private String     reglink ;
	@Column(name="views2",  nullable=true)
	private Integer     views2 ;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getUsername() {
		return username;
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
	public String getWdate() {
		return wdate;
	}
	public void setWdate(String wdate) {
		this.wdate = wdate;
	}
	public String getWtime() {
		return wtime;
	}
	public void setWtime(String wtime) {
		this.wtime = wtime;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	public String getTopics() {
		return topics;
	}
	public void setTopics(String topics) {
		this.topics = topics;
	}
	public String getBanner() {
		return banner;
	}
	public void setBanner(String banner) {
		this.banner = banner;
	}
	public String getReglink() {
		return reglink;
	}
	public void setReglink(String reglink) {
		this.reglink = reglink;
	}
	public Integer getViews2() {
		return views2;
	}
	public void setViews2(Integer views2) {
		this.views2 = views2;
	}
	

}
