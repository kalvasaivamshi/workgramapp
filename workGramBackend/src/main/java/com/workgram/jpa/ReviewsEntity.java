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
@Table(name="ratings", catalog="workgram" )
// Define named queries here
@NamedQueries ( {
	@NamedQuery ( name="ReviewsEntity.countAll", query="SELECT COUNT(x) FROM ReviewsEntity x" )
} )
public class ReviewsEntity implements Serializable {
		private static final long serialVersionUID = 1L;
		@Id
		 @Column(name="id", nullable=false)
		    private Integer     id ;
		 @Column(name="wid", length=5)
		 private String     wid ;
		 @Column(name="username", length=50)
		 private String     username ;
		 @Column(name="review", length=5000)
		 private String     review ;
		 @Column(name="rdate", length=500)
		 private String     rdate ;
		public Integer getId() {
			return id;
		}
		public void setId(Integer id) {
			this.id = id;
		}
		public String getWid() {
			return wid;
		}
		public void setWid(String wid) {
			this.wid = wid;
		}
		public String getUsername() {
			return username;
		}
		public void setUsername(String username) {
			this.username = username;
		}
		public String getReview() {
			return review;
		}
		public void setReview(String review) {
			this.review = review;
		}
		public String getRdate() {
			return rdate;
		}
		public void setRdate(String rdate) {
			this.rdate = rdate;
		}
		 
}
