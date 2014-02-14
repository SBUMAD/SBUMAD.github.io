---
layout: post
title:  "Java To Objective C"
date:   2014-02-10 21:34:10
categories: android tutorials
github: https://github.com/SBUMAD/JottoGame
---
<h2> Java To ObjC </h2>

<p> In iOS development, Objective-C is only supported native languge. However, for those familiar with C/C++, Objective C won't be too alien. ObjC shouldn't be through of as an new language but rather an expansion on top of C to include Object-Orienated functionality; hence the name Objective-C.  </p>

<p> However, unless you have been programming for Mac Os X for year, you have probably never written a ObjC program. So I thought I'd build a tutorial to explain the basic concepts of Obj-C coming from a Java prespective. </p>

<p> If you have little C++ experience, then you may find practice of builidng a header and a main file tedious. However, that is the convention of C/C++/ObjC and they have their own advantages when you get to high proficiency. So trying to bare with it at first.</p>

<p> Here are some Java to ObjC translations </p>

<h3> Strings => NSString </h3>
{% highlight java %}
String str = "String";
{% endhighlight %}

{% highlight objective-c %}
NSString *str = @"String";
{% endhighlight %}

<p> The '@' means this String is a literal string not a NSString or a C/C++ String. The NS prefix is a bit of heritage; NS stands for NextStar which is the compnay Steve Jobbs started after temporarly leaving Apple. </p>

<h3> ArrayLists => NSMutableArray </h3>

{% highlight java %}
ArrayList<String> strs = new ArrayList<String>();
{% endhighlight %}

{% highlight objective-c %}
NSMutableArray strs = [NSMutableArray array];
{% endhighlight %}

<p> The NSMutable Array fulfills the same functionality as the Java Arraylist except it doesn't support Generics. It will add in any Objects </p>

<h3> Main Function</h3>

{% highlight java %}
public static void main(String[] args){
  
}
{% endhighlight %}

{% highlight objective-c %}
int main(int argc, const char * argv[])
{
    @autoreleasepool {
        
        // insert code here...
    }
    return 0;
}
{% endhighlight %}

<p> Classes </p>

<p> Now lets build a class object in Java </p>

{% highlight java %}
class FooBar{
  private int x;
  public int y;
  public FooBar(){
    this.x = 0;
    this.y = 1;
  }
  public int getX(){
    return x;
  }
  public void setX(int x){
    this.x = x;
  }
  public int foo(int z){
    return bar() + z;
  }
  public int bar(){
    return x+y;
  }
}
{% endhighlight %}

{% highlight objective-c %}
//.h file
@interface FooBar :: NSObject
@property int x;
@property (nonatomic) int y;
-(void) setX: int x;
-(int) foo: int z;
-(int) bar;
@end
//.m file
@implementation FooBar
-(id) init:
{
self.x = 0;
self.y = 1;
}

-(void) setX:int x{
  self.x = x;
}

-(int) foo: int z{
  return [self bar] + x;
}
-(int) bar{
  return self.x = self.y;
}
@end
{% endhighlight %}

<h2> JavaToObjC </h2>

<p> I have written a Java program that displays some basic fundamentals [Objects, Inhertiance, Polymorphism, Generics, Interfaces].</p>

<p> You can download the Java code here: <a href="JavaFundamentals"> LINK </a> </p> <p>and you can download the ObjC code here <a href="JavaToObjc"> LINK </a></p>

To open a basic console commandline ObjC project in Xcode. You start new project, OS X -> CommandLine tool and make sure TYPE is Foundation. <em> This is how you would build a basic C/C++ program with XCode. Just change the Type to C/C++</em>

<h3> Person </h3>
{% highlight java %}

public abstract class Person implements Gender
{
  private String name;
  private Calendar birthday;
  private Person father;
  private Person mother;
  private Person spouse;
  private ArrayList<Person> children;
  public Person(String name, Calendar birthday)
  {
    this.name = name;
    this.birthday = birthday;
  }
  public String getName(){return name;}
  public void setName(String name){ this.name = name;}
  public Calendar getBirthday(){return birthday;}
  public void setBirthday(Calendar birthday){ this.birthday = birthday;}
  public int calculateAge(){
    Calendar today = Calendar.getInstance();
    Calendar dob = birthday;
    int age = today.get(Calendar.YEAR) - dob.get(Calendar.YEAR);
    if (today.get(Calendar.MONTH) < dob.get(Calendar.MONTH)) {
        age--;  
      } else if (today.get(Calendar.MONTH) == dob.get(Calendar.MONTH)
          && today.get(Calendar.DAY_OF_MONTH) < dob.get(Calendar.DAY_OF_MONTH)) {
        age--;  
      }
    return age;
  }
  
  public Person getFather(){ return father;}
  public void setFather(Person p){father = p;}
  public Person getMother(){ return mother;}
  public void setMother(Person p){mother = p;}
  public Person getSpouse(){return spouse;}
  public void setSpouse(Person p){
    spouse = p; 
    if(p.getSpouse() == null)
    { p.setSpouse(this);  }
  }
  public void addChild(Person p){ 
    if(children == null)
      children = new ArrayList<Person>();
    children.add(p);
    if(isMale()){
      p.father = this;
    }else{
      p.mother = this;
    }
    if(spouse != null && !spouse.alreadyClaimedChild(p)){
      if(isMale()){
        p.mother = spouse;
        
      }else{
        p.father = spouse;
      }
      spouse.addChild(p);
    }
  }
  public boolean alreadyClaimedChild(Person p){
    if(children == null)
      return false;
    //normally i would setup some sort of search tree but since people rarely have more than 3 kids this shouldn't be an issue
    for(Person child : children)
    {
      if(child.name.equals(p.name))
        return true;
    }
    return false;
  }
  public void addParents(Person dad, Person mom){
    this.father = dad;
    this.mother = mom;
  }
  public ArrayList<Person> getChildren(){return children;}
  /**
   * 
   * @param int index i
   * @return Person p
   * @throws IndexOutOfBoundsException
   */
  public Person getChild(int i) throws IndexOutOfBoundsException{
    return children.get(i);
  }
  
  public String toString(){
    String result =  name+":\t{Age:\t"+this.calculateAge(); 
    result+= "\n\t\tBDAY:\t"+birthday.get(Calendar.MONTH)+"/"+birthday.get(Calendar.DATE)+"/"+birthday.get(Calendar.YEAR);
    if(spouse != null)
      result += "\n\t\tSpouse:\t"+spouse.name;
    if(father != null)
      result += "\n\t\tFather:\t"+father.name;
    if(mother != null)
      result += "\n\t\tMother:\t"+mother.name;
    if(children != null){
      result += "\n\t\tChildren: ";
      for(int i=0;i<children.size();i++){
        result += "\n\t\t\t"+children.get(i).name;
      }
    }
    return result+"}\n";
  }
}

{% endhighlight %}
{% highlight objective-c %}
//..Person.h
#import <Foundation/Foundation.h>
#import "Gender.h"
@interface Person : NSObject<Gender>
@property NSString *name;
@property NSDateComponents *birthday;
@property Person *father;
@property Person *mother;
@property (nonatomic) Person *spouse;
@property NSMutableArray *children;
-(int)calculateAge;
-(id)init:(NSString *)name :(NSDateComponents *) bday;
-(NSString *) toString;
-(BOOL) alreadyClaimedChild: (Person *) p;
-(void) addParents:(Person *) dad : (Person *) mom;
-(void) addChild:(Person *) p;
-(void) setSpouse: (Person *) p;
+(NSDateComponents *) makeBday: (int) month :(int) date :(int) year;
@end
//..Person.m
#import "Person.h"
@implementation Person
-(id) init:(NSString *)name :(NSDateComponents *)bday
{
    self = [super init];
    if(self){
        self.name = name;
        self.birthday = bday;
    }
    return self;
}

-(BOOL) isMale{return false;}
-(BOOL) isFemale{return false;}
-(NSString *) gender{return @"NONE";}

-(int) calculateAge{
    NSDateComponents *components = [[NSCalendar currentCalendar] components:NSDayCalendarUnit | NSMonthCalendarUnit | NSYearCalendarUnit fromDate:[NSDate date]];
    NSInteger year = [components year];
    return (int) (year - self.birthday.year);
}

-(NSString *) toString{
    NSString *result = [NSString stringWithFormat:@"\n%@:\t{Age:\t%d", self.name, [self calculateAge] ];
    result = [NSString stringWithFormat:@"%@\n\t\t\tBDay:\t%ld/%ld/%ld", result, self.birthday.month, self.birthday.day, (long)self.birthday.year ];
    if(self.spouse != nil){
        result = [NSString stringWithFormat:@"%@\n\t\t\tSpouse:\t%@", result, self.spouse.name ];
    }
    if(self.father != nil)
        result = [NSString stringWithFormat:@"%@\n\t\t\tFather:\t%@", result, self.father.name ];
    if(self.mother != nil)
        result = [NSString stringWithFormat:@"%@\n\t\t\tMother:\t%@", result, self.mother.name ];
    if(self.children != nil)
    {
        result = [NSString stringWithFormat:@"%@\n\t\t\tChildren:\t", result];
        for(Person *p in self.children) {
            result = [NSString stringWithFormat:@"%@\n\t\t\t\t%@", result, p.name ];
        }
    }
    result = [NSString stringWithFormat:@"%@}", result ];
    return result;
}

-(BOOL) alreadyClaimedChild:(Person *)p{
    for(Person *c in self.children)
    {
        if([p.name isEqualTo:c.name])
            return true;
    }
    return false;
}
-(void) addParents:(Person *)dad :(Person *)mom{
    self.father = dad;
    self.mother = mom;
}
-(void) addChild:(Person *)p{
    if(self.children == nil)
        self.children = [NSMutableArray array];
    [self.children addObject:p];
    if(self.isMale){
        p.father = self;
    }else{
        p.mother = self;
    }
    if(self.spouse != nil && ![self.spouse alreadyClaimedChild:p]){
        if(self.isMale){
            p.mother = self.spouse;
        }else{
            p.father = self.spouse;
        }
        [self.spouse addChild:p];
    }
}

+(NSDateComponents *) makeBday: (int) month : (int) day : (int) year{
    NSDateComponents *bday = [[NSDateComponents alloc] init];
    [bday setYear:year];
    [bday setMonth:month];
    [bday setDay:day];
    return bday;
}

-(void) setSpouse:(Person *)p{
    _spouse = p;
    if(p.spouse == nil){
        [p setSpouse:self];
    }
}
@end

{% endhighlight %}
<p> Gender </p>
{% highlight java %}

public interface Gender {
  public String gender();
  public boolean isMale();
  public boolean isFemale();
}

{% endhighlight %}
{% highlight objective-c %}
@protocol Gender <NSObject>
-(BOOL) isMale;
-(BOOL) isFemale;
-(NSString *) gender;
@end

{% endhighlight %}
<p> Male/Female</p>
{% highlight java %}
import java.util.Calendar;


public class Male extends Person implements Gender{

  public Male(String name, Calendar birthday) { super(name, birthday);}
  @Override
  public String gender() {  return "Male";}
  @Override
  public boolean isMale() { return true;}
  @Override
  public boolean isFemale() { return false;}

}


public class Female extends Person implements Gender{
  private String maidenName;
  public Female(String name, Calendar birthday) { super(name, birthday);}
  @Override
  public String gender() {  return "Female";}
  @Override
  public boolean isMale() { return false;}
  @Override
  public boolean isFemale() { return true;}
  public String maidenName(){
    return maidenName;
  }
  public void setMaidenName(String s){ maidenName = s;}
  
  @Override
  public String toString()
  {
    String result = super.toString();
    int x = result.indexOf("Spouse");
    if(x > 0){
      return result.substring(0,x) +"Maiden:\t"+ this.maidenName +"\n\t\t"+ result.substring(x);
    }
    return result;
  }
}

{% endhighlight %}
{% highlight objective-c %}
// female.h
#import <Foundation/Foundation.h>
#import "Person.h"
@interface Female : Person
@property NSString *maiden;
@end
// female.m
#import "Female.h"
@implementation Female
-(BOOL) isFemale{return true;}
-(BOOL) isMale{return false;}
-(NSString *) gender{return @"Female";}
@end
// male.h
#import <Foundation/Foundation.h>
#import "Person.h"
@interface Male : Person
@end
// male.m
#import "Male.h"

@implementation Male
-(BOOL) isFemale{return false;}
-(BOOL) isMale{return true;}
-(NSString *) gender{return @"Male";}
@end
{% endhighlight %}

<h2> Now for the main functions </h2>
{% highlight java%}
import java.util.Calendar;

/**
 * 
 * @author max
 * 02-10-2014
 */
public class Main {
  public static void main(String[] args)
  {
    Male obama = new Male("Barack Obama", bday(8, 4, 1961));
    Female michelle = new Female("Michelle Obama", bday(01, 17, 1964));
    michelle.setSpouse(obama);
    michelle.setMaidenName("Robinson");
    Female malia = new Female("Malia Obama", bday(07, 04, 1998));
    Female natasha = new Female("Natasha Obama", bday(06, 10, 2001));
    obama.addChild(malia);
    obama.addChild(natasha);
    System.out.println(obama);
    System.out.println(michelle);
    System.out.println(malia);
    System.out.println(natasha);
  }
  private static Calendar bday(int month, int day, int year){
    Calendar temp = Calendar.getInstance();
    temp.set(year, month, day);
    return temp;
  }
}

{% endhighlight %}
{% highlight objective-c%}

#import <Foundation/Foundation.h>
#import "Person.h"
#import "Male.h"
#import "Female.h"
int main(int argc, const char * argv[])
{

    @autoreleasepool {
        
        // insert code here...
        NSString *name = @"Barack Obama";
        NSDateComponents *bday = [[NSDateComponents alloc] init];
        [bday setYear:1961];
        [bday setMonth:8];
        [bday setDay:4];
        Male *obama = [[Male alloc] init:name :bday];
        Female *michelle = [[Female alloc] init:@"Michelle Obama" :[Person makeBday:01 : 17 : 1964]];
        [michelle setSpouse:obama];
        Female *malia = [[Female alloc] init:@"Malie Obama" :[Person makeBday:07 :04 :1998]];
        Female *natasha = [[Female alloc] init:@"Natasha Obama" :[Person makeBday:06 :01 :2001]];
        [obama addChild:malia];
        [obama addChild:natasha];
        NSLog([NSString stringWithFormat:@"%@%@%@%@" ,[obama toString], [michelle toString], [malia toString] ,[natasha toString]]);
    }
    return 0;
}
{% endhighlight %}

<h2> Recommended iOS Tutorials </h2>
<ul>
<li><a href="http://www.appcoda.com/ios-programming-course/"> App Coda iO6 tutorials </a></li>
</ul>
