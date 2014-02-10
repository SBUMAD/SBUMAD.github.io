---
layout: post
title:  "Android-Jotto-Game"
date:   2014-02-09 21:34:10
categories: android tutorials
---
<h2> Jotto Game </h2>

<p>In this tutorial I will be demostrating how to build an app that plays the game Jotto with the user. I choose to build this app because it always me to cover a lot of useful topics</p>
<ol>
  <li>Internal Database</li>
  <li>Relative VS Linear Layouts</li>
  <li>Dialogs</li>
  <li>Spannable Strings</li>
  <li>Among Others</li>
</ol>

<p>If you would like to working copy here is the <a href="../../../../../apk/JottoGame2.apk"> APK </a> and <a href="https://github.com/SBUMAD/JottoGame"> Source </a></p>

<h3> What is Jotto? </h3>
<p> Jotto is a word game where player A, in this case the computer, selects a random 5 letter word. Then player B, the mobile user, may guess it. After every guess, the computer will tell the user how many letters their guess have in common with the answer. Until they finally get it right.</p>


<pre><code> Step 1: build an android application as usually. Just make sure we have a Minimum SDK of atleast 9 </code> </pre>

<h3> Internal Database</h3>
<p> The first thing we need to recognize is that we will need a Database to store all 5757 valid english 5 letter words. Otherwise that would take up a lot of applications random access memory along with being incrediblely inefficeint search times. So we will be using the built in SQLite databsae. If you are familiar with MySQL or PostGreSQL from web development then querying SQLite won't be too strange. </p>
<em> To learn in more detail check out:  </em>
<p> now add a new class <strong>DatabaseHandler.java</strong></p>
{% highlight java %}
import android.database.sqlite.SQLiteOpenHelper;
public class DatabaseHandler extends SQLiteOpenHelper{
  private static String DB_NAME = "jottogame.db";
  private static String DB_PATH = "";
  private static String TAG = "DatabaseHandler";
  private Context myContext; 
  public DatabaseHandler(Context context)  
  { 
      super(context, DB_NAME, null, 1);// 1? its Database Version 
      DB_PATH = "/data/data/" + context.getPackageName() + "/databases/"; 
      this.myContext = context; 
  }
  // We will ignore these functions. Since we are importing a preexisting database, we will be building our own custom creation methods
  @Override
  public void onCreate(SQLiteDatabase arg0) {}
  @Override
  public void onUpgrade(SQLiteDatabase arg0, int arg1, int arg2) {} 
}
{% endhighlight %}

<p> Next thing is that we need to import the database I've already precompiled for you <a href="../../../../../apk/jottogame.db"> DatabaseFile.</a> You will then paste that into your assets folder.</p>

<p> Now we need to copy this database into our app. </p>
{% highlight java %}
import android.database.sqlite.SQLiteOpenHelper;
public class DatabaseHandler extends SQLiteOpenHelper{
  //... 
  private SQLiteDatabase myDataBase;
  public DatabaseHandler(Context context)  
  { 
      //...
  }
  //...
  public void createDataBase() throws IOException 
  { 
      //If database not exists copy it from the assets 
   
      boolean myDataBaseExist = checkDataBase(); 
      if(!myDataBaseExist) 
      { 
          this.getReadableDatabase(); 
          this.close(); 
          try  
          { 
              //Copy the database from assests 
              copyDataBase(); 
              Log.e(TAG, "createDatabase database created"); 
          }  
          catch (IOException mIOException)  
          { 
              throw new Error("ErrorCopyingDataBase"); 
          } 
      } 
  } 
  //Check that the database exists here: /data/data/your package/databases/DB_Name 
  private boolean checkDataBase() 
  { 
    File dbFile = new File(DB_PATH + DB_NAME); 
    //Log.v("dbFile", dbFile + "   "+ dbFile.exists()); 
        return dbFile.exists(); 
    } 
 
    //Copy the database from assets 
    private void copyDataBase() throws IOException 
    { 
        InputStream mInput = myContext.getAssets().open(DB_NAME); 
        String outFileName = DB_PATH + DB_NAME; 
        OutputStream mOutput = new FileOutputStream(outFileName); 
        byte[] mBuffer = new byte[1024]; 
        int mLength; 
        while ((mLength = mInput.read(mBuffer))>0) 
        { 
            mOutput.write(mBuffer, 0, mLength); 
        } 
        mOutput.flush(); 
        mOutput.close(); 
        mInput.close(); 
    } 
   
      //Open the database, so we can query it 
  public boolean openDataBase() throws SQLException 
  { 
    String myPath = DB_PATH + DB_NAME; 
    //Log.v("mPath", mPath); 
    myDataBase = SQLiteDatabase.openDatabase(myPath, null, SQLiteDatabase.CREATE_IF_NECESSARY); 
    //mDataBase = SQLiteDatabase.openDatabase(myPath, null, SQLiteDatabase.NO_LOCALIZED_COLLATORS); 
        return myDataBase != null; 
    } 
 
    @Override 
    public synchronized void close()  
    { 
        if(myDataBase != null) 
            myDataBase.close(); 
        super.close(); 
    }
}
{% endhighlight %}

<p> Now lets add a function so we can access this database. </p>

{% highlight java %}
import android.database.sqlite.SQLiteOpenHelper;
public class DatabaseHandler extends SQLiteOpenHelper{
  //... 
  public DatabaseHandler(Context context)  
  { 
      //...
  }
  //...
  public String getWord(int x)
  {
    String result = "Jotto";
    String query = "SELECT * FROM "+TABLE_WORDS+" WHERE id ="+x;
    SQLiteDatabase db = this.getReadableDatabase();
    Cursor cursor = db.rawQuery(query, null);
    if(cursor.moveToFirst()){
      result = cursor.getString(1);
    }
    cursor.close();
    db.close();
    return result;
  }
  
  public String getRandomWord(){
    int rand = (int) (Math.random()*NUM_WORDS);
    return getWord(rand);
  }
}
{% endhighlight %}

<p> Now to see the fruits of our labors. open your <strong> MainActivity.java</strong></p>

{% highlight java %}
public class MainActivity extends Activity {
  private DatabaseHandler db;
  private String TAG = "MAIN";
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);
    loadData();
  }

  public void loadData(){
    db = new DatabaseHandler(this);
    try {
      db.createDataBase();
    } catch (IOException e) {
      // TODO Auto-generated catch block
      e.printStackTrace();
    }
    try{
      db.openDataBase();
    }catch( SQLException e){
      Log.e(TAG, e.toString());
    }
    Log.i(TAG,db.getRandomWord());
  }
}
{% endhighlight %}

<p> Now check the LogCAT for that random word. It will be an INFO message</p>

<h2> Relative Layout </h2>
<p> Now that we have a database setup it time to start taking in user input </p>
<p> Before you used the Linear Layout, today I will demonstrate how to use the Relative Layout. The core difference is that the Linear Layout just appends elements while the Relative Layout allows you to place more complicated rules to widgets. For example you may want a button always at the button of the app or this particular text field should always be above this spinner. Relative Layout makes these kind of arrangements easy  </p>

<em> To learn in more detail check out:  </em>
<p> Open up <strong> activity_main.xml </strong></p>

{% highlight java %}
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:paddingBottom="@dimen/activity_vertical_margin"
    android:paddingLeft="@dimen/activity_horizontal_margin"
    android:paddingRight="@dimen/activity_horizontal_margin"
    android:paddingTop="@dimen/activity_vertical_margin"
    tools:context=".MainActivity" >

    <EditText
        android:layout_width="fill_parent" 
        android:layout_height="wrap_content"
        android:inputType="text"
      android:imeOptions="actionDone"
        android:id="@+id/EditText01" /> 

    <LinearLayout 
        android:id="@+id/Guesslayout"
        android:orientation="horizontal" 
        android:paddingLeft="4.0dip" 
        android:paddingTop="5.0dip" 
        android:paddingRight="4.0dip" 
        android:paddingBottom="1.0dip" 
        android:layout_width="fill_parent" android:layout_height="wrap_content" 
        android:layout_below="@+id/EditText01"> 

        <Button 
            android:id="@+id/Giveup"
            android:layout_width="0.0dip" android:layout_height="fill_parent" 
            android:text="Give Up" 
            android:layout_weight="1.0" /> 
        <Button 
            android:id="@+id/Guess" 
            android:layout_width="0.0dip" android:layout_height="fill_parent" 
            android:text="Guess" 
            android:layout_weight="1.0" /> 
    </LinearLayout>
  <LinearLayout 
      android:id="@+id/AFLayout"
        android:orientation="horizontal" 
        android:layout_width="fill_parent" android:layout_height="wrap_content" 
        android:layout_below="@+id/Guesslayout"></LinearLayout>
  <LinearLayout 
      android:id="@+id/GLLayout"
        android:orientation="horizontal" 
        android:layout_width="fill_parent" android:layout_height="wrap_content" 
        android:layout_below="@+id/AFLayout"></LinearLayout>
  <LinearLayout 
      android:id="@+id/MRLayout"
        android:orientation="horizontal" 
        android:layout_width="fill_parent" android:layout_height="wrap_content" 
        android:layout_below="@+id/GLLayout"></LinearLayout>
  <LinearLayout 
      android:id="@+id/SXLayout"
        android:orientation="horizontal" 
        android:layout_width="fill_parent" android:layout_height="wrap_content" 
        android:layout_below="@+id/MRLayout"></LinearLayout>
  <LinearLayout 
      android:id="@+id/YZLayout"
        android:orientation="horizontal" 
        android:layout_width="fill_parent" android:layout_height="wrap_content" 
        android:layout_below="@+id/SXLayout"></LinearLayout>
    <ScrollView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_below="@+id/YZLayout"
        android:layout_centerHorizontal="true">
        <TextView
        android:id="@+id/GuessList"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:ems="10" />
    </ScrollView>
</RelativeLayout>

{% endhighlight %}

<p> You will notice some interesting characteristics on these widgets. For example, ScrollView's 'layout_centerHorizontal' and 'layout_below'. These are both unique to Relative Layout. One forces the scrollview to be in the center of the parent layout while the other makes sure the ScrollView is below the indentified LinearLayout</p>

<h3> User input</h3>
<p> Open up <strong> MainActivity.java</strong></p>
{% highlight java %}
public class MainActivity extends Activity {
  private DatabaseHandler db;
  private String TAG = "MAIN";
  private String answer;
  private ArrayList<String> guesses = new ArrayList<String>();
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);
    loadData();
    newGameListener();
    newGame();
    addGuessListener();
  }
  
  //...
  
  private String inCommon(String wordA, String wordB) {
    String common = "";
    for(int i=0;i<wordA.length();i++){  
        for(int j=0;j<wordB.length();j++){  
            if(wordA.charAt(i)==wordB.charAt(j)){  
                common += wordA.charAt(i);  
                break;
            }  
        }  
    } 
    return common;
  }
  private void makeAGuess(){
    EditText et01 = (EditText) findViewById(R.id.EditText01);
    String input = et01.getText().toString();
    //make sure it is a meaningful and valid guess
    if (input != null && !input.isEmpty() && input.length() == 5){
      //Log.i(TAG, "Check if valid guess");
      if(db.isValidGuess(input))
      {
        guesses.add(input);
        //Log.i(TAG, guesses.get(guesses.size()-1));
        TextView guessList = (TextView) findViewById(R.id.GuessList);
        String temp = guessList.getText().toString();
        guessList.setText(input+": ("+inCommon(answer, input).length()+") \n"+temp);
        InputMethodManager imm = (InputMethodManager) getSystemService(Context.INPUT_METHOD_SERVICE);
        imm.hideSoftInputFromWindow(et01.getWindowToken(), 0);
        if(input.equals(answer))
        {
          AlertDialog.Builder builder = new AlertDialog.Builder(this.getApplicationContext());
          builder.setMessage("Congrats!\nyou just won with "+guesses.size()+" guesses.\n");
          builder.setPositiveButton("New Game", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface arg0, int arg1) {
              newGame();
            }
          });
          AlertDialog dialog = builder.create();
          dialog.show();
        }
        recolorLetter();
      }else{
        //Log.i(TAG, "NOT a valid guess");
        Toast.makeText(getApplicationContext(), input+" is not a valid guess", Toast.LENGTH_SHORT).show();
      }
    }
  }
  private void addGuessListener() {
    Button btnG = (Button) findViewById(R.id.Guess);
    btnG.setBackgroundResource(android.R.drawable.btn_default);
    EditText et01 = (EditText) findViewById(R.id.EditText01);
    et01.setOnEditorActionListener(new OnEditorActionListener() {                     
        @Override
        public boolean onEditorAction(TextView v, int actionId, KeyEvent event) {
            makeAGuess();
            return true;
        }
    });
    btnG.setOnClickListener(new OnClickListener(){
      
      @Override
      public void onClick(View v) {
        makeAGuess();
      }
    });
  }
 
  
  private void newGameListener(){
    Button btnNG = (Button) findViewById(R.id.Giveup);
    btnNG.setBackgroundResource(android.R.drawable.btn_default);
    btnNG.setOnClickListener(new OnClickListener(){
      @Override
      public void onClick(View arg0) {
        AlertDialog.Builder builder = new AlertDialog.Builder(arg0.getContext());
        builder.setMessage("The answer was "+answer.toUpperCase());
        builder.setPositiveButton("Close", null);
        AlertDialog dialog = builder.create();
        dialog.show();
        newGame();
      }
    });
  }
  
  private void newGame() {
    answer = db.getRandomWord();
    guesses = new ArrayList<String>();
    Log.i(TAG, answer);
    TextView guessList = (TextView) findViewById(R.id.GuessList);
    guessList.setText("");
    for(char c = 'A';c<='Z';c++)
    {
      Button btn = (Button) findViewById(c);
      btn.setBackgroundResource(android.R.drawable.btn_default);
    }
  }

}

{% endhighlight %}
