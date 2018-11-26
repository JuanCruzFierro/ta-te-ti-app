import React from 'react';
import { 
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Button,
 } from 'react-native';
import { MaterialCommunityIcons as Icon } from 'react-native-vector-icons';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      juego: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ],
      jugador_actual: 1,
    }
  }

  componentDidMount() {
    this.iniciarJuego();
  };

  iniciarJuego = () => {
    this.setState({
      juego: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ],
      jugador_actual: 1,
    });
  };

  ganador = () => {
    const NUMERO_BALDOSAS = 3;
    var vector = this.state.juego;
    var suma;

    // Comprobar filas
    for (var i = 0; i < NUMERO_BALDOSAS; i++) {
      suma = vector[i][0] + vector[i][1] + vector[i][2];
      if (suma == 3) { return 1; }
      else if (suma == -3) { return -1; }
    }

    // Comprobar columnas
    for (var i = 0; i < NUMERO_BALDOSAS; i++) {
      suma = vector[0][i] + vector[1][i] + vector[2][i];
      if (suma == 3) { return 1; }
      else if (suma == -3) { return -1; }
    }

    // Comprobar diagonales
    suma = vector[0][0] + vector[1][1] + vector[2][2];
    if (suma == 3) { return 1; }
    else if (suma == -3) { return -1; }

    suma = vector[0][2] + vector[1][1] + vector[2][0];
    if (suma == 3) { return 1; }
    else if (suma == -3) { return -1; }

    // No hay ganadores
    return 0;
  };

  alPresionarBaldosa = (fila, columna) => {
    // Evitar que las baldosas marcadas cambien
    var valor_aux = this.state.juego[fila][columna];
    if (valor_aux !== 0) {return;};

    // Traer al jugador
    var jugadorActual = this.state.jugador_actual;

    // Establecer la baldosa correcta
    var aux = this.state.juego.slice();
    aux[fila][columna] = jugadorActual;
    this.setState({juego: aux});

    // Cambiar al siguiente jugador
    var siguienteJugador = (jugadorActual == 1) ? -1: 1;
    this.setState({jugador_actual: siguienteJugador});

    // Buscar ganador
    var vencedor = this.ganador();
    if (vencedor == 1) {
      Alert.alert('El Jugador 1 es el ganador');
      this.iniciarJuego();
    } else if (vencedor == -1) {
      Alert.alert('El Jugador 2 es el ganador');
      this.iniciarJuego();
    }
  };

  jugarOtraVez = () => {
    this.iniciarJuego();
  }

  renderizarIcono = (fila, columna) => {
    var valor = this.state.juego[fila][columna];
    switch(valor) {
      case 1: return (
        <Icon name='close' style={styles.baldosaX} />
      );
      case -1: return (
        <Icon name='circle-outline' style={styles.baldosaO} />
      );
      default: return (
        <View />
      );
    }   
  };

  render() {
    return (
      <View style={styles.container}>

        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity 
          style={[styles.baldosa, {borderLeftWidth: 0, borderTopWidth: 0}]}
          onPress={() => {this.alPresionarBaldosa(0, 0)}}>
            {this.renderizarIcono(0, 0)}
          </TouchableOpacity>

          <TouchableOpacity 
          style={[styles.baldosa, { borderTopWidth: 0}]}
          onPress={() => {this.alPresionarBaldosa(0, 1)}}>
            {this.renderizarIcono(0, 1)}
          </TouchableOpacity>

          <TouchableOpacity 
          style={[styles.baldosa, {borderRightWidth: 0, borderTopWidth: 0}]}
          onPress={() => {this.alPresionarBaldosa(0, 2)}}>
            {this.renderizarIcono(0, 2)}
          </TouchableOpacity>
        </View>

        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity 
          style={[styles.baldosa, {borderLeftWidth: 0}]}
          onPress={() => {this.alPresionarBaldosa(1, 0)}}>
            {this.renderizarIcono(1, 0)}
          </TouchableOpacity>

          <TouchableOpacity 
          style={styles.baldosa}
          onPress={() => {this.alPresionarBaldosa(1, 1)}}>
            {this.renderizarIcono(1, 1)}
          </TouchableOpacity>

          <TouchableOpacity 
          style={[styles.baldosa, {borderRightWidth: 0}]}
          onPress={() => {this.alPresionarBaldosa(1, 2)}}>
            {this.renderizarIcono(1, 2)}
          </TouchableOpacity>
        </View>

        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity 
          style={[styles.baldosa, {borderLeftWidth: 0, borderBottomWidth: 0}]}
          onPress={() => {this.alPresionarBaldosa(2, 0)}}>
            {this.renderizarIcono(2, 0)}
          </TouchableOpacity>

          <TouchableOpacity 
          style={[styles.baldosa, {borderBottomWidth: 0}]}
          onPress={() => {this.alPresionarBaldosa(2, 1)}}>
            {this.renderizarIcono(2, 1)}
          </TouchableOpacity>

          <TouchableOpacity 
          style={[styles.baldosa, {borderRightWidth: 0, borderBottomWidth: 0}]}
          onPress={() => {this.alPresionarBaldosa(2, 2)}}>
            {this.renderizarIcono(2, 2)}
          </TouchableOpacity>
        </View>

        <View style={{paddingTop: 40}} />
        <Button title='Nuevo Juego' onPress={this.jugarOtraVez}/>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  baldosa: {
    borderWidth: 5,
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  baldosaX: {
    color: 'red',
    fontSize: 60,
  },
  baldosaO: {
    color: 'green',
    fontSize: 60,
  },
});
