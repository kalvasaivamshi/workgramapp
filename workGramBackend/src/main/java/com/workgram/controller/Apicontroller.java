package com.workgram.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.workgram.jpa.FreelancerEntity;
import com.workgram.jpa.LoginEntity;
import com.workgram.jpa.UsersEntity;
import com.workgram.jpa.WorkshopsEntity;
import com.workgram.model.GeneralResponse;
import com.workgram.model.LoginModel;
import com.workgram.model.userModel;
import com.workgram.model.workshopModel;
import com.workgram.model.FreeLancerModel;
import com.workgram.repository.FreelancerJpaRepository;

import com.workgram.repository.UserJpaRepository;
import com.workgram.repository.WorkshopJpaRepository;
import com.workgram.repository.LoginJpaRepository;

@RestController
@RequestMapping("api/")
public class Apicontroller {
	@Autowired
	private LoginJpaRepository loginJpaRepository;
	@Autowired
	private FreelancerJpaRepository freelancerJpaRepository;
	@Autowired
	private WorkshopJpaRepository workshopJpaRepository;
	@Autowired 
	private  UserJpaRepository userJpaRepository;

	@GetMapping("test")
	public void startApi() {
		System.out.println("test");
	}

	@PostMapping("login")
	public ResponseEntity<GeneralResponse> login(@RequestBody LoginModel model) {
		try {
			LoginEntity login = loginJpaRepository.findByUsernameAndPassword(model.getUsername(), model.getPassword());
			if(login!=null) {
				model.setPassword(null);
				model.setRole(login.getRole());
				model.setStatus(login.getStatus());
				return new ResponseEntity<GeneralResponse>(new GeneralResponse(true,"Success", HttpServletResponse.SC_OK, model), HttpStatus.OK);
			} else {
				return new ResponseEntity<GeneralResponse>(new GeneralResponse(false,"Invalid Credentials", HttpServletResponse.SC_CONFLICT, null), HttpStatus.CONFLICT);
			}
		} catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<GeneralResponse>(new GeneralResponse(false,"Exception", HttpServletResponse.SC_CONFLICT, null), HttpStatus.CONFLICT);
		}
	}
	@PostMapping("addFreeLancers")
	public ResponseEntity<GeneralResponse> addFreeLancers(@RequestBody FreeLancerModel model){

		try{
			FreelancerEntity freelancer=new FreelancerEntity();
			freelancer.setEmail(model.getEmail());
			freelancer.setName(model.getName());
			freelancer.setExp(model.getExp());
			freelancer.setMobile(model.getMobile());
			freelancer.setPhoto(toBase64(model.getPhoto()));
			freelancer.setQualification(model.getQualification());
			freelancer.setSkillset(model.getSkillset());
			freelancer.setUsername(model.getUsername());
			freelancer.setStatus(model.getStatus());
			freelancerJpaRepository.save(freelancer);
			LoginEntity login=new LoginEntity();
			login.setUsername(model.getUsername());
			login.setPassword(model.getPassword());
			login.setRole(model.getRole());
			login.setStatus(model.getStatus());
			loginJpaRepository.save(login);
			return new ResponseEntity<GeneralResponse>(new GeneralResponse(true,"Success", HttpServletResponse.SC_OK, model), HttpStatus.OK);}
		catch(Exception e){
			e.printStackTrace();
			return new ResponseEntity<GeneralResponse>(new GeneralResponse(false,"Exception", HttpServletResponse.SC_CONFLICT, null), HttpStatus.CONFLICT);

		}



	}

	@PostMapping("addUsers")
	public ResponseEntity<GeneralResponse> addUsers(@RequestBody userModel model){
		try{
			System.out.println(model.getPassword());
			UsersEntity user=new UsersEntity();
			user.setEmail(model.getEmail());
			user.setName(model.getName());
			user.setMobile(model.getMobile());
			user.setUsername(model.getUsername());
			user.setAddress(model.getAddress());
			userJpaRepository.save(user);
			LoginEntity login=new LoginEntity();
			login.setUsername(model.getUsername());
			login.setPassword(model.getPassword());
			login.setRole(model.getRole());
			loginJpaRepository.save(login);
			
			return new ResponseEntity<GeneralResponse>(new GeneralResponse(true,"Success", HttpServletResponse.SC_OK, model), HttpStatus.OK);}
		catch(Exception e){
			e.printStackTrace();
			return new ResponseEntity<GeneralResponse>(new GeneralResponse(false,"Exception", HttpServletResponse.SC_CONFLICT, null), HttpStatus.CONFLICT);

		}



	}
	@PostMapping("addWorkshops")
	public ResponseEntity<GeneralResponse> addWorkshops(@RequestBody String m){
		Gson gson = new GsonBuilder().serializeNulls().create();
		System.out.println(m);
		try{
			workshopModel model = gson.fromJson(m, workshopModel.class);
			WorkshopsEntity workshop=new WorkshopsEntity();
			workshop.setBanner(toBase64(model.getBanner()));
			workshop.setDescription(model.getDescription());
			workshop.setId(model.getId());
			workshop.setLocation(model.getLocation());
			workshop.setName(model.getName());
			workshop.setReglink(model.getReglink());
			workshop.setTopics(model.getTopics());
			workshop.setUsername(model.getUsername());
//			workshop.setViews2(model.getViews());
			workshop.setWdate(model.getWdate());
			workshop.setWtime(model.getWtime());


			workshopJpaRepository.save(workshop);
			return new ResponseEntity<GeneralResponse>(new GeneralResponse(true,"Success", HttpServletResponse.SC_OK, model), HttpStatus.OK);}
		catch(Exception e){
			e.printStackTrace();
			return new ResponseEntity<GeneralResponse>(new GeneralResponse(false,"Exception", HttpServletResponse.SC_CONFLICT, null), HttpStatus.CONFLICT);

		}



	}
	@GetMapping("getWorkShops")
	public ResponseEntity<GeneralResponse> getWorkShops(){
		try{
			List<WorkshopsEntity> workshopList = (List<WorkshopsEntity>) workshopJpaRepository.findAll();
			if(!workshopList.isEmpty()) {
				List<workshopModel> list = new ArrayList<>();
				for(WorkshopsEntity w : workshopList) {
					workshopModel model = new workshopModel();
					model.setBanner("http://localhost:8080/api/displayImage/"+w.getBanner());
					model.setDescription(w.getDescription());
					model.setId(w.getId());
					model.setLocation(w.getLocation());
					model.setName(w.getName());
					model.setReglink(w.getReglink());
					model.setTopics(w.getTopics());
					model.setUsername(w.getUsername());
					model.setViews(w.getViews2());
					model.setWdate(w.getWdate());
					model.setWtime(w.getWtime());
					list.add(model);
				}
				return new ResponseEntity<GeneralResponse>(new GeneralResponse(true,"Success", HttpServletResponse.SC_OK, list), HttpStatus.OK);
			} else
				return new ResponseEntity<GeneralResponse>(new GeneralResponse(false,"No Data", HttpServletResponse.SC_CONFLICT, null), HttpStatus.CONFLICT);
		} catch(Exception e){
			e.printStackTrace();
			return new ResponseEntity<GeneralResponse>(new GeneralResponse(false,"Exception", HttpServletResponse.SC_CONFLICT, null), HttpStatus.CONFLICT);
		}
	}

	@GetMapping("getFreeLancers")
	public ResponseEntity<GeneralResponse> getFreeLancers(){
		try{
			List<FreelancerEntity> freeLancer = (List<FreelancerEntity>) freelancerJpaRepository.findAll();
			if(!freeLancer.isEmpty()) {
				List<FreeLancerModel> list = new ArrayList<>();
				for(FreelancerEntity w : freeLancer) {
					FreeLancerModel model = new FreeLancerModel();
					model.setEmail(w.getEmail());
					model.setExp(w.getExp());
					model.setMobile(w.getMobile());
					model.setName(w.getName());
					model.setPhoto("http://localhost:8080/api/displayImage/"+w.getPhoto());
					model.setQualification(w.getQualification());
					model.setSkillset(w.getSkillset());
					model.setUsername(w.getUsername());
					model.setStatus(w.getStatus());
					list.add(model);
				}
				return new ResponseEntity<GeneralResponse>(new GeneralResponse(true,"Success", HttpServletResponse.SC_OK, list), HttpStatus.OK);
			} else
				return new ResponseEntity<GeneralResponse>(new GeneralResponse(false,"No Data", HttpServletResponse.SC_CONFLICT, null), HttpStatus.CONFLICT);
		} catch(Exception e){
			e.printStackTrace();
			return new ResponseEntity<GeneralResponse>(new GeneralResponse(false,"Exception", HttpServletResponse.SC_CONFLICT, null), HttpStatus.CONFLICT);
		}
	}
	@GetMapping("getFreeLancersByUserName/{username}")
	public ResponseEntity<GeneralResponse> getFreeLancersByUserName(@PathVariable String username){
		try{
			List<FreelancerEntity> freeLancer = (List<FreelancerEntity>) freelancerJpaRepository.findByUsername(username);
			if(!freeLancer.isEmpty()) {
				List<FreeLancerModel> list = new ArrayList<>();
				for(FreelancerEntity w : freeLancer) {
					FreeLancerModel model = new FreeLancerModel();
					model.setEmail(w.getEmail());
					model.setExp(w.getExp());
					model.setMobile(w.getMobile());
					model.setName(w.getName());
					model.setPhoto("http://localhost:8080/api/displayImage/"+w.getPhoto());
					model.setQualification(w.getQualification());
					model.setSkillset(w.getSkillset());
					model.setUsername(w.getUsername());
					list.add(model);
				}
				return new ResponseEntity<GeneralResponse>(new GeneralResponse(true,"Success", HttpServletResponse.SC_OK, list), HttpStatus.OK);
			} else
				return new ResponseEntity<GeneralResponse>(new GeneralResponse(false,"No Data", HttpServletResponse.SC_CONFLICT, null), HttpStatus.CONFLICT);
		} catch(Exception e){
			e.printStackTrace();
			return new ResponseEntity<GeneralResponse>(new GeneralResponse(false,"Exception", HttpServletResponse.SC_CONFLICT, null), HttpStatus.CONFLICT);
		}
		}
	@GetMapping("getWorkShopsByUserName/{username}")
	public ResponseEntity<GeneralResponse> getWorkShopsByUserName(@PathVariable String username){
		try{
			List<WorkshopsEntity> workshopList = (List<WorkshopsEntity>) workshopJpaRepository.findByUsername(username);
			if(!workshopList.isEmpty()) {
				List<workshopModel> list = new ArrayList<>();
				for(WorkshopsEntity w : workshopList) {
					workshopModel model = new workshopModel();
					model.setBanner("http://localhost:8080/api/displayImage/"+w.getBanner());
					model.setDescription(w.getDescription());
					model.setId(w.getId());
					model.setLocation(w.getLocation());
					model.setName(w.getName());
					model.setReglink(w.getReglink());
					model.setTopics(w.getTopics());
					model.setUsername(w.getUsername());
					model.setViews(w.getViews2());
					model.setWdate(w.getWdate());
					model.setWtime(w.getWtime());
					list.add(model);
				}
				return new ResponseEntity<GeneralResponse>(new GeneralResponse(true,"Success", HttpServletResponse.SC_OK, list), HttpStatus.OK);
			} else
				return new ResponseEntity<GeneralResponse>(new GeneralResponse(false,"No Data", HttpServletResponse.SC_CONFLICT, null), HttpStatus.CONFLICT);
		} catch(Exception e){
			e.printStackTrace();
			return new ResponseEntity<GeneralResponse>(new GeneralResponse(false,"Exception", HttpServletResponse.SC_CONFLICT, null), HttpStatus.CONFLICT);
		}
	}
	
	@GetMapping("/displayImage/{image}")
	public ResponseEntity<byte[]> displayImage(@PathVariable("image") String image, HttpServletRequest request) throws IOException {
		byte[] bytearray =  Files.readAllBytes(Paths.get("C:/home/"+image));
		return ResponseEntity.ok().contentType(MediaType.IMAGE_PNG).body(bytearray);
	}
	
	public static String toBase64(String pic) {

		// String extension = FilesUtil.getProperty("ImageExtension");
		String path = "C:/home/";

		// path = new File(".").getCanonicalPath() +"/" + path;

		// System.out.println("NEW PATH: " + path);
		File fileImg = new File(path);
		fileImg.mkdirs();
		//
		// pic = URLDecoder.decode(pic);

		byte[] imgBytes = org.apache.commons.codec.binary.Base64.decodeBase64(pic);
		String fileName = (new SimpleDateFormat("yyyyMMddhhmmssSSSS").format(new Date()) + ".png").trim();

		fileImg = null;
		fileImg = new File(path + fileName);

		if (fileImg.exists()) {
			fileImg = null;
			fileImg = new File(path + fileName);
		}

		FileOutputStream fOut;
		try {
			fOut = new FileOutputStream(fileImg);
			fOut.write(imgBytes);
			fOut.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

			return fileName;
	}
	@GetMapping("update/username/{username}/status/{status}")
	public ResponseEntity<GeneralResponse> update(@PathVariable String username,@PathVariable String status) {
		try {
			LoginEntity login = loginJpaRepository.findByUsername(username);
			List<FreelancerEntity> freeL = (List<FreelancerEntity>) freelancerJpaRepository.findByUsername(username);
//			System.out.println(login);
			if(login!=null&& freeL!=null) {
				login.setStatus(status);
				FreelancerEntity free = freeL.get(0);
				free.setStatus(status);
				System.out.println(free);
				System.out.println(login);
				freelancerJpaRepository.save(free);
				loginJpaRepository.save(login);
				return new ResponseEntity<GeneralResponse>(new GeneralResponse(true,"Success", HttpServletResponse.SC_OK, null), HttpStatus.OK);
			} else {
				return new ResponseEntity<GeneralResponse>(new GeneralResponse(false,"Invalid Credentials", HttpServletResponse.SC_CONFLICT, null), HttpStatus.CONFLICT);
			}
		} catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<GeneralResponse>(new GeneralResponse(false,"Exception", HttpServletResponse.SC_CONFLICT, null), HttpStatus.CONFLICT);
		}
	}
	
	
}
