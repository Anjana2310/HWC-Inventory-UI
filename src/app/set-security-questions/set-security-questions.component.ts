import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../login/authentication.service';
import { ConfirmationService } from '../app-modules/core/services/confirmation.service';
import { AuthService } from 'app/app-modules/core/services/auth.service';

@Component({
  selector: 'app-set-security-questions',
  templateUrl: './set-security-questions.component.html',
  styleUrls: ['./set-security-questions.component.css']
})
export class SetSecurityQuestionsComponent implements OnInit {

  constructor(
    public router: Router,
    private authService: AuthenticationService,
		private confirmationService: ConfirmationService,
    private auth: AuthService) { }

  handleSuccess(response) {
    this.questions = response.data;
    this.replica_questions = response.data;
    console.log(this.questions);
  }

  handleError(response) {
    console.log('error', this.questions);
  }

  ngOnInit() {
    this.uid = localStorage.getItem('userID');
    this.uname = localStorage.getItem('username');
    this.authService.getSecurityQuestions().subscribe(
      (response: any) => this.handleSuccess(response),
      (error: any) => this.handleError(error)
    );
  }

  uid: any
  uname: any;
  passwordSection: boolean = false;
  questionsection: boolean = true;

  switch() {
    this.passwordSection = true;
    this.questionsection = false;
  }

  dynamictype: any = "password";

  showPWD() {
    this.dynamictype = 'text';
  }

  hidePWD() {
    this.dynamictype = 'password';
  }

  question1: any = "";
  question2: any = "";
  question3: any = "";

  answer1: any = '';
  answer2: any = '';
  answer3: any = '';

  questions: any = [];
  replica_questions: any = [];
  Q_array_one: any = [];
  Q_array_two: any = [];

  selectedQuestions: any = [];

  updateQuestions(selectedques, position) {
    console.log("position", position, "Selected Question", selectedques);
    console.log("before if else block, selected questions", this.selectedQuestions);

    if (this.selectedQuestions.indexOf(selectedques) == -1) {
      this.selectedQuestions[position] = selectedques;
      if (position === 0) {
        this.answer1 = "";
      }
      if (position === 1) {
        this.answer2 = "";
      }
      if (position === 2) {
        this.answer3 = "";
      }
      console.log("if block, selected questions", this.selectedQuestions);
    }
    else {
      if (this.selectedQuestions.indexOf(selectedques) != position) {
        this.confirmationService.alert("This Question is already selected. Choose Unique Question");
      }
      else {
        this.confirmationService.alert("This question is mapped at this position already");
      }
      console.log("else block, selected questions", this.selectedQuestions);
      console.log("position else block", position);

      // this.disableAnswerField(position);
    }
  }

  filterArrayOne(questionID) {

    /*reset the 2nd and 3rd question and answer fields */
    this.question2 = "";
    this.answer2 = "";

    this.question3 = "";
    this.answer3 = "";

    /*filter the primary array based on the selection and feed resultant to Q_array_one*/
    this.Q_array_one = this.filter_function(questionID, this.replica_questions);
    // this.questions=this.Q_array_one;
  }

  filterArrayTwo(questionID) {
    /*reset the 3rd question and answer field */
    this.question3 = "";
    this.answer3 = "";

    /*filter the Q_array_one based on the selection and feed resultant to Q_array_two*/
    this.Q_array_two = this.filter_function(questionID, this.Q_array_one);
  }

  filter_function(questionID, array) {
    let dummy_array = [];
    for (let i = 0; i < array.length; i++) {
      if (array[i].QuestionID === questionID) {
        continue;
      }
      else {
        dummy_array.push(array[i]);
      }
    }
    return dummy_array;
  }

  dataArray: any = [];

  setSecurityQuestions() {
    console.log(this.selectedQuestions, this.selectedQuestions.length, 'yo')
    if (this.answer1 && this.answer2 && this.answer3) {
      this.dataArray = [
        {
          'userID': this.uid,
          'questionID': this.question1,
          'answers': this.answer1,
          'mobileNumber': '1234567890',
          'createdBy': this.uname
        },
        {
          'userID': this.uid,
          'questionID': this.question2,
          'answers': this.answer2,
          'mobileNumber': '1234567890',
          'createdBy': this.uname
        },
        {
          'userID': this.uid,
          'questionID': this.question3,
          'answers': this.answer3,
          'mobileNumber': '1234567890',
          'createdBy': this.uname
        }];

      console.log("Request Array", this.dataArray);
      console.log("selected questions", this.selectedQuestions);

      this.switch();
    }  else {
      this.confirmationService.alert("All 3 questions should be different. Please check your selected Questions");
    }
  }

  oldpwd: any;
  newpwd: any;
  confirmpwd: any;

  updatePassword(new_pwd) {
    if (new_pwd === this.confirmpwd) {
      this.authService.saveUserSecurityQuestionsAnswer(this.dataArray).subscribe(
        (response: any) => this.handleQuestionSaveSuccess(response, new_pwd),
        (error: any) => this.handleQuestionSaveError(error)
      );
    }
    else {
      this.confirmationService.alert("Password doesn't match");
    }
  }

  handleQuestionSaveSuccess(response, new_pwd) {
    if(response && response.statusCode == 200 && response.data.transactionId !== undefined && response.data.transactionId !== null){
    const transactionId = this.authService.transactionId;
    console.log('saved questions', response);
    this.authService.setNewPassword(this.uname, new_pwd, response.data.transactionId).subscribe(
      (response: any) => this.successCallback(response),
      (error: any) => this.errorCallback(error)
    );
    }
    else
    {
      this.confirmationService.alert(response.errorMessage, 'error');
      
    }

  }

  handleQuestionSaveError(response) {
    console.log('question save error', response);
  }

  successCallback(response) {
    console.log(response);
    this.confirmationService.alert("Password changed successfully",'success');
    this.logout();
    // localStorage.clear();
    // sessionStorage.clear();
    // this.router.navigate(['/']);
  }

  logout() {
    this.auth.logoutUser().subscribe(res => {
      if (res && res.statusCode == 200) {
        this.router.navigate(["/login"]);
        localStorage.clear();
        sessionStorage.clear();
      }
    });
  }

  errorCallback(response) {
    console.log(response);
  }

}
