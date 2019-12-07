import 'package:flutter/material.dart';
import 'dart:async';
import 'dart:convert';
import 'package:http/http.dart' as http;

class Login extends StatefulWidget {
  @override
  _LoginState createState() => _LoginState();
}

class _LoginState extends State<Login> {

  String url = 'https://randomuser.me/api';

  Future<String> makeRequest() async {
    var response = await http
      .get(Uri.encodeFull(url), headers: {'Accept': 'applicaton/json'});
    print(response.body);
    List data;
    var extractData = json.decode(response.body);
    data = extractData['results'];
    print(data[0]['name']['first'] + ' ' + data[0]['name']['last']);
    return (data[0]['name']['first'] + ' ' + data[0]['name']['last']);
  }


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Login'),
      ),
      body: new Center( 
        child: RaisedButton(
          child: Text('Make Request'),
          onPressed: makeRequest,
        ),
        
      ),
    );
  }
}
