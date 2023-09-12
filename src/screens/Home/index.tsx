import { Text, View, TextInput, TouchableOpacity, FlatList, Alert } from "react-native";
import { styles } from "./styles";
import { Participant } from "../../components/Participant";
import { useState } from "react";

export default function Home() {
  const [participants, setParticipants] = useState<string[]>([])
  const [user, setUser] = useState<string>('')

	function handleParticipantAdd(participant: string) {
    console.log(participant);
		if(participants.includes(participant)) {
      return Alert.alert('Participante duplicado', 'Já existe um participante na lista com esse nome')
    }
    setParticipants([...participants, participant])
    setUser('')
	}

  function handleParticipantRemove(name: string) {
    Alert.alert("Remover", `Deseja remover o participante ${name}?`, [
      {
        text: "Sim",
        onPress: () => {
          setParticipants(participants.filter(particiant => particiant != name))
          Alert.alert("Deletado!")
        }

      },
      {
        text: "Não",
        style: 'cancel'
      }
    ])
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>
        Nome do evento
      </Text>

      <Text style={styles.eventDate}>
        Sexta, 4 de Novembro de 2022.
      </Text>

			<View style={styles.form}>

				<TextInput 
				style={styles.input}
				placeholder="Nome do participante"
				placeholderTextColor="#6B6B6B"
        value={user}
        onChangeText={setUser}
				/>

				<TouchableOpacity style={styles.button} onPress={() => handleParticipantAdd(user)}>
					<Text style={styles.buttonText}>+</Text>
				</TouchableOpacity>
			</View>

    <FlatList  
      data={participants}
      keyExtractor={item => item}
      renderItem={({item}) => (
        <Participant 
          key={item}
          name={item}
          onRemove={handleParticipantRemove}
        />
      )}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={() => (
        <Text style={styles.listEmptyText}>Ninguém chegou no evento ainda? Adicione participantes a sua lista de presença.</Text>
      )}
    />
    


			

    </View>
  )
}