int delayGen = 1000;
int led02 = 13;
int maxNumber = 3800;
int minNumber = 2400;
int fltTara = 0;

void setup() {
  Serial.begin(2400);
  fltTara = 0;
  pinMode(led02, OUTPUT);
  digitalWrite(led02, LOW);

  randomSeed(analogRead(0));
}

void loop() {
  fltTara = random(minNumber, maxNumber);
  Serial.println(fltTara);
  digitalWrite(led02, HIGH);
  delay(delayGen);
  digitalWrite(led02, LOW);
  delay(delayGen);
}

