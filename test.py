def calculate_state(n):
    shoe_states = 2 ** n
    player_states = 9
    hit_points = 6
    knowledge_states = 3 ** n
    return shoe_states * player_states * hit_points * knowledge_states

def calculate_total_states():
    total_states = 0
    for n in range(1, 11):
        n_state = calculate_state(n)
        print(f"{n}: {n_state}")
        total_states += n_state
    return total_states

if __name__ == "__main__":
    total = calculate_total_states()
    print(f"Total possible states from length 1 to 10: {total}")