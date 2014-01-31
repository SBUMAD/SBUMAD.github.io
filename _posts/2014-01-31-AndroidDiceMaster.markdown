---
layout: post
title:  "Android Dice Master"
date:   2014-01-29 21:34:10
categories: android tutorials
---

<h2> Dice Master </h2>
<p> In this tutorial, we will be building a dice rolling app. It will be able to roll n number of dice of one of the Platonic solid dice {4, 6, 8, 10, 12, 20} or a coin. The app will spit out the sum. </p>
<p> The goal of this tutorial is to teach you how to read in user input and apply changes to the applications views in real time. As well as explain the concept of Android resources. </p>

<h2> Getting Started </h2>
<p> This tutorial assumes you have a working Android environment. If not, please follow our <a src="2014-01-29-AndroidSetup.html">Setup Tutorial</a> before continuing this tutorial</p>

<p> First create a new application named DiceMaster </p>

<h2> Adding Resources </h2>
<p> Resources are precompiled primitive variables, usual integers or strings, to be used for UI settings. The purpose is simplify UI creation as well improve performance. </p>
<p> For those familiar with Web development, you can think of the XML templats as your HTML and the resources are your CSS. You can create all of your HTML and CSS through Javascript if you really wanted to but that is haphazardous and unnecessary complexity</p>

<p> you will find the resources in the /RES/ folder, and open up the file <strong>res/layout/activity_main.xml</strong>/</p>

<p> Now you are going to change the XML to this </p>
{% highlight java %}
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="fill_parent"
    android:layout_height="fill_parent"
    android:orientation="vertical">
    <TextView
      android:id="@+id/TextViewTitle"
      android:layout_width="wrap_content"
      android:layout_height="wrap_content"
      android:text="@string/numberOfSides"
      android:textSize="10pt"
      >
  </TextView>
  <Spinner 
      android:id="@+id/SpinnerFeedbackType"
      android:layout_height="wrap_content"
      android:layout_width="match_parent"
      android:prompt="@string/spinnertext"
      android:entries="@array/feedbacktypelist"
      android:layout_below="@id/TextViewTitle"
      >
      <requestFocus />
  </Spinner>
  <TextView
      android:id="@+id/NumberOfDice"
      android:layout_width="wrap_content"
      android:layout_height="wrap_content"
      android:text="@string/numberOfDice"
      android:textSize="10pt"
      android:layout_below="@id/SpinnerFeedbackType">
  </TextView>
  <EditText 
      android:id="@+id/ETNumberOfDice"
      android:layout_height="wrap_content"
      android:hint="@string/numberOfDiceHint"
      android:inputType="number"
      android:layout_width="match_parent"
      android:layout_below="@id/NumberOfDice"
      android:text="@string/defaultEditText"
      />
  <Button
      android:id="@+id/ButtonSendFeedback"
      android:layout_height="wrap_content"
      android:text="@string/feedbackbutton"
      android:onClick="diceRoll"
      android:layout_width="match_parent"
      android:layout_centerInParent="true"></Button>
  <TextView
      android:id="@+id/Result"
      android:layout_width="wrap_content"
      android:layout_height="wrap_content"
      android:text="@string/result"
      android:textSize="50pt"
      android:layout_below="@id/ButtonSendFeedback"
      android:layout_centerInParent="true">
  </TextView>
    

</RelativeLayout>
{% endhighlight %}

<p> I know this is a lot of text so hopefully I can explain it well enough that we don't have to go into too much detail. This layout is using the Relative Layout which followings an idea of alignments and positions. So see the last TextView element, see how it has {% highlight java %}android:layout_below="@id/ButtonSendFeedback"
android:layout_centerInParent="true" {% endhighlight %} that means that it will be placed below element that has the id ButtonSendFeedback and it will be aligned to the Center of its parent element aka the RelativeLayout</p>

<p> Next you are going to open <strong> res/values/strings.xml</strong> and edit it to this</p>
{% highlight java %}
<?xml version="1.0" encoding="utf-8"?>
<resources>

    <string name="app_name">DiceMaster</string>
    <string name="action_settings">Settings</string>
    <string name="hello_world">Hello world!</string>
    <string name="feedbacktitle">DiceMaster</string>
    <string name="spinnertext">Pick the number of sides</string>
  <string name="feedbackbutton">Roll</string>
  <string name="numberOfDice">Number of Dice</string>
  <string name="numberOfDiceHint">Number of Dice</string>
  <string name="numberOfSides">Number of Sides</string>
  <string name="defaultEditText">1</string>
  <string name="result"></string>
  <string name="feedbacktype1">2</string>
  <string name="feedbacktype2">4</string>
  <string name="feedbacktype3">6</string>
  <string name="feedbacktype4">8</string>
  <string name="feedbacktype5">10</string>
  <string name="feedbacktype6">12</string>
  <string name="feedbacktype7">20</string>
  <string-array name="feedbacktypelist">
      <item>@string/feedbacktype1</item>
      <item>@string/feedbacktype2</item>
      <item>@string/feedbacktype3</item>
      <item>@string/feedbacktype4</item>
      <item>@string/feedbacktype5</item>
      <item>@string/feedbacktype6</item>
      <item>@string/feedbacktype7</item>
  </string-array>
</resources>

{% endhighlight %}

<h2> Now do a test Run </h2>
<p> It should look like something like this: </p>

<p> So what is going on? Well, first we are building static literal strings to generate these ui elements. The array of strings is useful for the Spinner element since it requires a set of values. </p>

<h2> Lets get the INPUT!!</h2>
<p> now lets build some interactivity between the View and Activity </p>

<p> First thing first we need to get the spinner's value since that is what is going to decide what type of dice we are going to roll</p>
{% highlight java %}
 public void diceRoll(View Button)
    {
      Spinner numberOfSides = (Spinner) findViewById(R.id.SpinnerFeedbackType);
      String sNumberOfSides = numberOfSides.getSelectedItem().toString();
      int iNumberOfSides = Integer.parseInt(sNumberOfSides);
    }
{% endhighlight %}

<p> After that we need to get the EditText's value so we know how many dice we are to roll </p>
{% highlight java %}
 public void diceRoll(View Button)
    {
      ...
      EditText numberOfDice = (EditText) findViewById(R.id.ETNumberOfDice);
      String input = numberOfDice.getText().toString();
      int iNumberOfDice = Integer.parseInt(input);
    }
{% endhighlight java %}

<p> Next we are going to create the sum. We will just be using the basic Math.random function  </p>
{% highlight java %}
public void diceRoll(View Button)
    {
      ...
      int sum = 0;
      for(int i=0;i<iNumberOfDice;i++)
      {
        sum += rollDice(iNumberOfSides);
      }
    }
    
    public int rollDice(int numSides){
      return (int)(Math.random()*numSides) + 1;
    }

{% endhighlight %}

<p> Finally we need to print out this new value to the View UI</p>
{% highlight java %}
public void diceRoll(View Button)
    {
      ...
      TextView result = (TextView) findViewById(R.id.Result);
      result.setText(""+sum);
    }
{% endhighlight %}

<h2> Challenges: </h2>
<ul> 
  <li> Why don't you see if you can't create a way to do different types of dices. For example, roll two 6 sided dice and one 8 sided one. You will liking have to add a new button to handle this queuing of dice rolls</li>
</ul>



