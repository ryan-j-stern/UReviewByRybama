import 'package:flutter/material.dart';
import 'package:ureview_mobile/dashboard.dart';
import 'package:ureview_mobile/login.dart';
import 'package:ureview_mobile/signup.dart';



void main() {
  runApp(App());
}

class App extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'UReview',
      home: Dashboard(),
      routes: <String, WidgetBuilder> {
        '/login': (context) => Login(),
        '/signup': (context) => Signup(),
      }
    );
  }
}