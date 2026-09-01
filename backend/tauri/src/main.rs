#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    clash_mimo_lib::run().unwrap();
}
