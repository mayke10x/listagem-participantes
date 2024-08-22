import { Text, View, TextInput, TouchableOpacity, FlatList, Alert } from "react-native";

import { styles } from "./styles";
import { Participant } from "../../components/Participant";
import { useState } from "react";

export function Home() {
    const [participants, setParticipants] = useState<string[]>([])
    const [newParticipant, setNewParticipant] = useState<string>('')

    function handleParticipantAdd() {
        if (!newParticipant.trim()) {
            return Alert.alert("Adicionar participante", "Necessário informar o nome do participante.")
        }

        if (participants.includes(newParticipant)) {
            return Alert.alert("Participante existe", "Já existe um participante na lista com este nome.")
        }

        setParticipants(prevState => [...prevState, newParticipant])
        setNewParticipant('')
    }

    function handleParticipantRemove(name: string) {
        Alert.alert("Remover participante", `Você deseja remover o participante ${name}?`, [
            {
                text: "Sim",
                onPress: () => setParticipants(prevState => prevState.filter(prev => prev !== name))
            },
            {
                text: "Não",
                style: 'cancel'
            },
        ])
    }

    return (
        <View style={styles.container}>
            <Text style={styles.eventName}>
                Nome do Evento
            </Text>

            <Text style={styles.eventDate}>
                Sexta, 4 de Novembro de 2024
            </Text>

            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Nome do participante"
                    placeholderTextColor="#6b6b6b"
                    value={newParticipant}
                    onChangeText={setNewParticipant}
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleParticipantAdd}
                >
                    <Text style={styles.buttonText}>
                        +
                    </Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={participants}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                    <Participant
                        key={item}
                        name={item}
                        onRemove={handleParticipantRemove}
                    />
                )}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => (
                    <Text style={styles.listEmptyText}>
                        Ninguém chegou no evento ainda? Adicione participantes a sua lista de presença.
                    </Text>
                )}
            />
        </View>
    )
}