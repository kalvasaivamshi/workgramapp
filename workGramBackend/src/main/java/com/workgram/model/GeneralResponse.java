package com.workgram.model;

public class GeneralResponse {
	private boolean status;
	private String message;
	private Object data;
	private long statusCode;
	private String token;
	
	public GeneralResponse() {
		super();
	}


	public GeneralResponse(boolean status, String message) {
		super();
		this.status = status;
		this.message = message;
		
	}

	public GeneralResponse(boolean status, String message, Object data) {
		super();
		this.status = status;
		this.message = message;
		this.data = data;
	}

	public GeneralResponse(boolean status, String message, long statusCode, Object data) {
		super();
		this.status = status;
		this.message = message;
		this.data = data;
		this.statusCode = statusCode;
	}
	
	public GeneralResponse(boolean status, String message, long statusCode, Object data, String token) {
		super();
		this.status = status;
		this.message = message;
		this.data = data;
		this.statusCode = statusCode;
		this.token = token;
	}
	
	public boolean getStatus() {
		return status;
	}
	
	public void setStatus(boolean status) {
		this.status = status;
	}
	
	public String getMessage() {
		return message;
	}
	
	public void setMessage(String message) {
		this.message = message;
	}
	
	public Object getData() {
		return data;
	}
	
	public void setData(Object data) {
		this.data = data;
	}
	
	public String getToken() {
		return token;
	}
	
	public void setToken(String token) {
		this.token = token;
	}
	
	public long getStatusCode() {
		return statusCode;
	}
	
	public void setStatusCode(long statusCode) {
		this.statusCode = statusCode;
	}
}
