int valorActual;
int valorAnterior = 0;

void setup() {
  Serial.begin(9600);
}

void loop() {
  //Lee el valor del puerto analogo
	valorActual = analogRead(A2);
	// Mapea el valor leido a un intervalo de 0 a 100
  valorActual = map(valorActual, 0, 1023, 0, 100);
	// lomita el rango del resultado
  valorActual = constrain(valorActual, 0, 100);

	// Se envian los datos solo cuando la lectura es diferente 
  if(valorActual != valorAnterior){
    if( valorActual > valorAnterior + 1 || valorActual < valorAnterior - 1 ){
			
			// Imprimo una cadena con formato JSON
      Serial.print("{\"sensor\":");
      Serial.print( valorActual );
      Serial.print("}\n");
      valorAnterior = valorActual;
			
    }
  }
  
  delay(10);
}